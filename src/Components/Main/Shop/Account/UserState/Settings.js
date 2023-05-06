import { useState } from 'react';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Stack,
    Space,
    Box,
    Popover,
    Progress
} from '@mantine/core';
import { auth } from "../../../../../Firebase-config";
import { useUpdateProfile, useAuthState } from 'react-firebase-hooks/auth';
import { IconX } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import { updateEmail, updatePassword } from 'firebase/auth'

function PasswordRequirement({ meets, label }) {
    return (
        <Text
            color={meets ? 'teal' : 'red'}
            sx={{ display: 'flex', alignItems: 'center' }}
            mt={7}
            size="sm"
        >
            {meets ? <IconCheck size={14} /> : <IconX size={14} />} <Box ml={10}>{label}</Box>
        </Text>
    );
}
const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export function AccountSettings(props) {
    const [updateProfile] = useUpdateProfile(auth);
    const [loading, setLoading] = useState(false)
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [user] = useAuthState(auth);
    const form = useForm({
        initialValues: {
            email: user?.email,
            name: user?.displayName,
        },

        validate: {
            email: (val) => (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ? null : 'Invalid email'),
            name: (val) => (val !== '' ? null : 'Invalid Name'),
        },
    });
    const formPassword = useForm({
        initialValues: {
            password: '',
        },

        validate: {
            password: (val) => (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(val) ? null : 'Invalid Password'),
        },
    });
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(formPassword.values.password)} />
    ));

    const strength = getStrength(formPassword.values.password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    const handleUpdateProfile = async (name, email) => {
        setLoading(true)
        await updateProfile({ displayName: name }).then(async () => {
            await updateEmail(user, email).then(() => {
                console.log(user);
                setLoading(false);
            })
        })

    }
    const handleUpdatePassword = async (password) => {
        if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
            setLoading(true)
            await updatePassword(user, password).then(() => {
                console.log(user);
                setLoading(false);
            }).catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <Paper radius="md" p="xl">
            <Text size="lg" weight={500} align="center" >
                Account Details
            </Text>
            <Space h="xl" />
            <div className='accountPage'>
                <form id='account' onSubmit={form.onSubmit(() => {
                    handleUpdateProfile(form.values.name, form.values.email)
                })}>
                    <Stack>
                        <TextInput
                            withAsterisk
                            required
                            label="Full name"
                            placeholder="John Doe"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            styles={() => ({
                                input: {
                                    '&:focus-within': {
                                        borderColor: 'lime',
                                    },
                                },
                            })}
                        />

                        <TextInput
                            withAsterisk
                            required
                            label="Email"
                            placeholder="hello@johndoe.com"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                            styles={() => ({
                                input: {
                                    '&:focus-within': {
                                        borderColor: 'lime',
                                    },
                                },
                            })}
                        />



                    </Stack>
                    <Group position="apart" mt="xl">

                        <Button type="submit"
                            loading={loading}
                            name="account_save"
                            color={'lime'}>Save Changes</Button>
                    </Group>
                </form>

                <Space h="xl" />
                <Space h="xl" />
                <form
                    id='passwordSettings'
                    onSubmit={form.onSubmit(() => {
                        handleUpdatePassword(formPassword.values.password)
                    })}
                >
                    <Popover opened={popoverOpened} position="bottom" width="target" transition="pop">
                        <Popover.Target>
                            <div
                                onFocusCapture={() => setPopoverOpened(true)}
                                onBlurCapture={() => setPopoverOpened(false)}
                            >
                                <PasswordInput
                                    label="Password"
                                    required
                                    placeholder="Update your password"
                                    value={formPassword.values.password}
                                    onChange={(event) => formPassword.setFieldValue('password', event.currentTarget.value)}
                                    error={formPassword.errors.password && 'Invalid Password'}
                                    styles={() => ({
                                        input: {
                                            '&:focus-within': {
                                                borderColor: 'lime',
                                            },
                                        },
                                    })}
                                />
                            </div>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
                            <PasswordRequirement label="Includes at least 6 characters" meets={formPassword.values.password.length > 5} />
                            {checks}
                        </Popover.Dropdown>
                    </Popover>
                    <Group position="apart" mt="xl">

                        <Button type="submit"
                            loading={loading}
                            name="password_save"
                            color={'lime'}>Update Pasword</Button>
                    </Group>

                </form>
            </div>
        </Paper>
    );
}