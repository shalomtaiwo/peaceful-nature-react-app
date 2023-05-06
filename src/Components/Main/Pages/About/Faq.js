import {
    createStyles,
    Title,
    Container,
    Accordion,
    ThemeIcon,
    MantineProvider,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    wrapper: {
        padding: `50px 0`,
        minHeight: "520px",
        backgroundImage: `radial-gradient(${theme.colors.green[8]} 0%, ${theme.colors.green[9]
            } 100%)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top left',
        position: 'relative',
        color: theme.black,
    },

    title: {
        color: theme.white,
        fontSize: 42,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: `40px`,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 32,
        },
    },

    item: {
        backgroundColor: theme.white,
        borderBottom: 0,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.lg,
        overflow: 'hidden',
    },

    control: {
        fontSize: theme.fontSizes.lg,
        padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
        color: theme.black,

        '&:hover': {
            backgroundColor: 'transparent',
        },
    },

    content: {
        paddingLeft: theme.spacing.xl,
        lineHeight: 1.6,
        color: theme.black,
    },

    icon: {
        ref: 'icon',
        marginLeft: theme.spacing.md,
    },

    gradient: {
        backgroundImage: `radial-gradient(${theme.colors.green[6]} 0%, ${theme.colors.green[5]
            } 100%)`,
    },

    itemOpened: {
        [`&icon`]: {
            transform: 'rotate(45deg)',
        },
    },
}));

const placeholder =
    'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';

export function FaqWithBg() {
    const { classes } = useStyles();
    return (
        <MantineProvider inherit theme={{ colorScheme: 'light' }}>
            <div className={classes.wrapper}>
                <Container size="sm">
                    <Title align="center" className={classes.title}>
                        Frequently Asked Questions
                    </Title>

                    <Accordion
                        chevronPosition="right"
                        defaultValue="reset-password"
                        chevronSize={50}
                        variant="separated"
                        disableChevronRotation
                        chevron={
                            <ThemeIcon radius="xl" className={classes.gradient} size={32}>
                                <IconPlus size="1.05rem" stroke={1.5} />
                            </ThemeIcon>
                        }
                    >
                        <Accordion.Item className={classes.item} value="reset-password">
                            <Accordion.Control>How can I reset my password?</Accordion.Control>
                            <Accordion.Panel>{placeholder}</Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item className={classes.item} value="another-account">
                            <Accordion.Control>Can I create more that one account?</Accordion.Control>
                            <Accordion.Panel>{placeholder}</Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item className={classes.item} value="newsletter">
                            <Accordion.Control>How can I subscribe to monthly newsletter?</Accordion.Control>
                            <Accordion.Panel>{placeholder}</Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item className={classes.item} value="credit-card">
                            <Accordion.Control>Do you store credit card information securely?</Accordion.Control>
                            <Accordion.Panel>{placeholder}</Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item className={classes.item} value="payment">
                            <Accordion.Control>What payment systems to you work with?</Accordion.Control>
                            <Accordion.Panel>{placeholder}</Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </div>
        </MantineProvider>
    );
}