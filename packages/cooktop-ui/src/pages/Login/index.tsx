import React, { useState } from "react";
import styled from "@emotion/styled";

import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/Auth";

const PageLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Container = styled.div`
    margin: auto;
    width: 380px;
    height: 355px;
    background: #373f4a;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    flex-wrap: wrap;
    color: #ddd;
`;

const Heading = styled.div`
    font-size: 34px;
    font-weight: 700;
    flex-basis: 1 100%;
`;

const Form = styled.div`
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
`;

const Field = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-basis: 100%;
    margin: 7px 0;

    label {
        font-weight: 700;
        flex: 0 0 100%;
        font-size: 15px;
    }
    input {
        border-radius: 5px;
        outline: none;
        border: 1px solid #adadad;
        margin: 5px 0;
        flex: 0 0 100%;
        padding: 12px;
    }
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 5px 0;
    flex-basis: 100%;
    margin-top: 3px;
`;

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useAuth();

    const submit = async () => {
        try {
            await signIn({ email, password });
        } catch (e) {
            alert('Sign in failed');
        }
    };
    
    return (
        <PageLayout>
            <Container>
                <Heading>
                    Log in
                </Heading>
                <Form>
                    <Field>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input name="email" value={email} onChange={({target}) => setEmail(target.value)}/>
                    </Field>
                    <Field>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input name="password" type="password" value={password} onChange={({target}) => setPassword(target.value)}/>
                    </Field>
                    <Actions>
                        <Button onClick={submit}>
                            Sign In
                        </Button>
                    </Actions>
                </Form>
            </Container>
        </PageLayout>
    )
}
