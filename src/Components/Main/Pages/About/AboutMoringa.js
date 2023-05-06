import { createStyles, Text, Title,  Button, Image } from '@mantine/core';
import image from './Assets/aboutBanner.png';

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        padding: `70px 40px`,
        width: "100%",
        borderRadius: theme.radius.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column-reverse',
            padding: theme.spacing.xl,
        },
    },

    image: {
        maxWidth: '40%',

        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%',
        },
    },

    body: {
        paddingRight: `60px`,

        [theme.fn.smallerThan('sm')]: {
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

export function AboutMoringa({ goTo }) {
    const { classes } = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.body}>
                <Title className={classes.title}>Wait a minute...</Title>
                <Text fw={500} fz="lg" mb={5}>
                    Buy Moringa Capsules here!
                </Text>
                <Text fz="sm" c="dimmed">

                </Text>

                <div className={classes.controls}>
                    <Button color={'green'} onClick={goTo} className={classes.control}>Shop</Button>
                </div>
            </div>
            <Image src={image} className={classes.image} />
        </div>
    );
}