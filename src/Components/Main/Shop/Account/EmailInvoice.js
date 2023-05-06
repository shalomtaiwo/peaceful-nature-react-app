import React from 'react';
import { Popover, Button, TextInput, Stack } from '@mantine/core';
import emailjs from "@emailjs/browser";

const EmailInvoice = () => {
    const form = React.useRef();

        emailjs
            .sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE,
                process.env.REACT_APP_EMAILJS_TEMPLATE,
                form.current,
                process.env.REACT_APP_EMAILJS_API
            )
            .then(
                (result) => {
                    console.log(result.text)
                },
                (error) => {
                    console.log(error.text);
                }
            );
            
    return (
        <div>
            <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <Button color='lime' variant='outline'>Send to Email</Button>
                </Popover.Target>
                <Popover.Dropdown sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}>
                    <form ref={form}>
                        <Stack>
                            <TextInput
                                label="Email"
                                placeholder="john@doe.com"
                                size="xs"
                                mt="xs"
                                styles={() => ({
                                    input: {
                                        '&:focus-within': {
                                            borderColor: 'lime',
                                        },
                                    },
                                })} />
                            <Button color='lime' variant='filled'>Send</Button>
                        </Stack>
                    </form>
                </Popover.Dropdown>
            </Popover>
        </div>
    )
}

export default EmailInvoice