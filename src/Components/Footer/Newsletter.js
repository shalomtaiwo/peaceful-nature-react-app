import React from 'react';
import { createStyles, Text, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing.xl * 2,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
            }`,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            flexDirection: 'column-reverse',
            padding: theme.spacing.xl,
        },
    },

    body: {
        paddingRight: theme.spacing.xl * 4,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            paddingRight: 0,
            marginTop: theme.spacing.xl,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
        marginBottom: theme.spacing.md,
    },

    controls: {
        display: 'flex',
        marginTop: theme.spacing.xl,
    },

    inputWrapper: {
        width: '100%',
        flex: '1',
    },

    input: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: 0,
    },

    control: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
}));

export function EmailBanner() {
    const { classes } = useStyles();
    const [loading, setLoading] = React.useState(false);

    const form = useForm({
        initialValues: {
            email: '',
        },

        validate: {
            email: (val) => (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ? null : 'Invalid email'),
        },
    });

    const handleSubscribe = (email) => {
        setLoading(true)
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "api-key": process.env.REACT_APP_SENDINBLUE_KEY,
            },
            body: JSON.stringify({
                email: email,
                attributes: { FNAME: "", LNAME: "" },
                emailBlacklisted: false,
                smsBlacklisted: false,
                listIds: [36],
                updateEnabled: false,
                smtpBlacklistSender: ["user@example.com"],
            }),
        };

        fetch("https://api.sendinblue.com/v3/contacts", options)
            .then((response) => response.json())
            .then((response) => {
                setLoading(false);
                console.log(response.message ? response.message : "Succesfully Subscribed");
            })
            .catch((err) => console.error(err));
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.body}>
                <Text weight={500} size="lg" mb={5}>
                    Subscribe to our newsletter!
                </Text>
                <Text size="sm" color="dimmed">
                    You will never miss important product updates and latest news.
                </Text>

                <form onSubmit={form.onSubmit(() => {
                    handleSubscribe(form.values.email);
                })} className={classes.controls}>
                    <TextInput
                        required
                        placeholder="hello@johndoe.com"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        classNames={{ input: classes.input, root: classes.inputWrapper }}
                        styles={() => ({
                            input: {
                                '&:focus-within': {
                                    borderColor: 'lime',
                                },
                            },
                        })}
                    />
                    <Button className={classes.control} color='lime' type='submit' loading={loading}>Subscribe</Button>
                </form>
            </div>
        </div>
    );
}