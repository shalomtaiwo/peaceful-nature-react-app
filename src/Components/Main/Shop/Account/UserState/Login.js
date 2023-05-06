import { useState } from 'react';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Space,
  Box,
  Popover,
  Progress
} from '@mantine/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../Firebase-config";
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import ReCAPTCHA from "react-google-recaptcha";
import { IconX } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';

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

export function AuthenticationForm(props) {
  const [type, toggle] = useToggle(['login', 'register']);
  const [updateProfile] = useUpdateProfile(auth);
  const [loading, setLoading] = useState(false);
  const [popoverOpened, setPopoverOpened] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      confirmPassword: '',
      password: '',
      recaptcha: null,
      terms: true,
    },

    validate: {
      email: (val) => (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ? null : 'Invalid email'),
      password: (val) => (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(val) ? null : 'Invalid Password'),
      confirmPassword: (val) => (val !== form.values.confirmPassword ? 'Passwords should be the same' : null),
    },
  });
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(form.values.password)} />
  ));

  const strength = getStrength(form.values.password);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  const handleSignUp = (name, email, password) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await updateProfile({ displayName: name }).then((res) => {
          console.log(res);
          setLoading(false);
        })
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log(error.code)
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }

  const handleSignIn = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        console.log(res);
        setLoading(false);
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log(error.code)
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500} align="center" >
        {upperFirst(type)} here
      </Text>
      <Space h="xl" />

      <form onSubmit={form.onSubmit(() => {
        type === 'login' ?
          handleSignIn(form.values.email, form.values.password)
          :
          handleSignUp(form.values.name, form.values.email, form.values.password)
      })}>
        <Stack>
          {type === 'register' && (
            <TextInput
              withAsterisk
              required={type === 'register' ? true : false}
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
          )}

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
          <Popover opened={popoverOpened} position="bottom" width="target" transition="pop">
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
              >
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                  error={form.errors.password && 'Invalid Password'}
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
              <PasswordRequirement label="Includes at least 6 characters" meets={form.values.password.length > 5} />
              {checks}
            </Popover.Dropdown>
          </Popover>

          {type === 'register' && (
            <>
              <PasswordInput
                required
                label="Confirm password"
                placeholder="Confirm your password"
                value={form.values.confirmPassword}
                onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                error={form.errors.confirmPassword && 'Passwords should be the same'}
                styles={() => ({
                  input: {
                    '&:focus-within': {
                      borderColor: 'lime',
                    },
                  },
                })}
              />
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                color="green"
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            </>
          )}
          {
            type === 'login' && (
              <Group position="apart" mt="lg">
                <Checkbox label="Remember me" sx={{ lineHeight: 1 }} color="green" />
                <Anchor onClick={(event) => event.preventDefault()} href="#" size="sm" color="green">
                  Forgot password?
                </Anchor>
              </Group>
            )
          }
        </Stack>
        <Space h="xl" />
        <Stack>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT_KEY}
            onChange={(event) => form.setFieldValue('recaptcha', event)}
          />
        </Stack>
        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit"
            loading={loading}
            disabled={((type === 'register') && (!form.values.terms || form.values.confirmPassword !== form.values.password)) || (form.values.recaptcha === null) ? true : false}
            color={'lime'}>{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}