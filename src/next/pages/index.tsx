import {
  createStyles,
  Container,
  Text,
  Button,
  Group,
  rem,
  Input,
  Grid,
  TextInput,
} from "@mantine/core";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: "relative",
    paddingTop: rem(200),
    paddingBottom: rem(120),

    [theme.fn.smallerThan("sm")]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(24),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    paddingLeft: rem(30),
    paddingRight: rem(30),
    flex: 1,

    [theme.fn.smallerThan("sm")]: {
      paddingLeft: rem(20),
      paddingRight: rem(20),
      flex: 1,
    },
  },
}));

function GradientText({ text }: { text: string }) {
  return (
    <Text component="span" variant="gradient" gradient={{ from: "blue", to: "cyan" }} inherit>
      {text}
    </Text>
  );
}

export default function HeroTitle() {
  const { classes } = useStyles();

  const [email, setEmail] = useState("");

  const { isSuccess, isLoading, isError, mutate: signup } = trpc.signup.useMutation();

  const handleSignup = () => {
    signup({ email });
  };

  const FormOrConfirmation = (() => {
    if (isSuccess) {
      return (
        <Text className={classes.description} color="gray.7">
          <h4>
            Welcome to the list, <GradientText text={email} />. We&lsquo;ll let you know when
            it&lsquo;s your turn to try <GradientText text="Validate" />.
          </h4>
        </Text>
      );
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSignup();
      }
    };
    return (
      <Grid grow columns={12}>
        <Grid.Col span={9}>
          <TextInput
            size="xl"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            error={isError && "invalid email"}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            onClick={handleSignup}
            disabled={isLoading}
          >
            Let&apos;s go
          </Button>
        </Grid.Col>
      </Grid>
    );
  })();

  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <h1 className={classes.title}>
          You have a <GradientText text="startup" /> idea.
        </h1>

        <Text className={classes.description} color="gray.7">
          <h3>
            But between idea and product-market-fit, there is a lot of uncertainty and work to do.
            And even uncertainty around what to do.
          </h3>
        </Text>

        <Text className={classes.description} color="gray.7">
          <h3>
            <GradientText text="Validate" />
            &nbsp;helps you test the market, build a MVP, refine your idea, and validate that the
            idea is worth pursuing. When you have conviction that your idea is&nbsp;
            <GradientText text="valid" />, you are halfway there.
          </h3>
        </Text>

        {FormOrConfirmation}
      </Container>
    </div>
  );
}
