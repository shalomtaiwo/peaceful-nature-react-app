import { useState } from 'react';
import { Group, Button, Modal } from '@mantine/core';
import { EmailBanner } from './Newsletter';

export function Subscription({children}) {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Group position="center">
                <Button onClick={() => setOpened((o) => !o)} variant='light' color={'lime'}>
                    {children}
                </Button>
            </Group>

            <Modal
                opened={opened}
                withCloseButton={false}
                onClose={() => setOpened(false)}
                size="lg"
                radius="md"
            >
                <EmailBanner />
            </Modal>
        </>
    );
}