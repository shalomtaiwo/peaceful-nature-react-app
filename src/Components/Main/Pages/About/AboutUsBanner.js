import { Title, Text, Overlay, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingTop: "150px",
        paddingBottom: "150px",
        backgroundImage:
            'url(https://res.cloudinary.com/dg8os5pul/image/upload/v1679384273/nutritional-supplement-moringa-powder-on-rustic-royalty-free-image-1659133952_xiqnsg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        [theme.fn.smallerThan('xs')]: {
            paddingTop: "120px",
            paddingBottom: "120px",
        },
    },

    inner: {
        position: 'relative',
        zIndex: 1,
    },

    title: {
        fontWeight: 800,
        fontSize: "30px",
        letterSpacing: "4px",
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        color: theme.white,
        marginBottom: theme.spacing.xs,
        textAlign: 'center',
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [theme.fn.smallerThan('xs')]: {
            fontSize: "30px",
            textAlign: 'left',
        },
    },

    highlight: {
        color: theme.colors.green[6],
    },

    description: {
        color: theme.colors.gray[0],
        textAlign: 'center',

        [theme.fn.smallerThan('xs')]: {
            fontSize: theme.fontSizes.md,
            textAlign: 'left',
        },
    },
}));

export function AboutUsBanner() {
    const { classes } = useStyles();

    return (
        <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.65} zIndex={1} />

            <div className={classes.inner}>

                <Title className={classes.title}>
                    About{' '}
                    <Text component="span" inherit className={classes.highlight}>
                        Moringa Oliefera
                    </Text>
                </Title>

            </div>
        </div>
    );
}