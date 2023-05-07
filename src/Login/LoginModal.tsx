import { useState, ChangeEvent } from 'react';
import { Box, Typography, Modal, CircularProgress,
    Button, TextField, Alert, Stack } from '@mui/material';

interface LoginModalProps {
    modalOpen: boolean,
    onChangeIsAdmin: (isAdmin: boolean) => void,
    onChangeModalOpen: (isAdmin: boolean) => void,
}
export function LoginModal(props : LoginModalProps) {
    const [fieldCheck, setFieldCheck] = useState(false)
    const [circularBar, setCircularBar] = useState(false)
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [loginSuccess, setLoginSuccess] = useState("")
    // "error" : 에러가 발생했습니다. "fail" : 로그인 실패

    const sleep = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
    const idChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setId(e.target.value);
    }
    const pwChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPw(e.target.value);
    }
    const loginButtonClickHandler = async () => {
        if (!id || !pw) { // 아이디 비밀번호 필수 입력 필드 체크
            setFieldCheck(true);
            return;
        }
        setCircularBar(true)
        await sleep(1000);
        const res = await fetch('http://13.209.90.70:80/user/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username : id,
                password: pw,
            })
        })
        const data = await res;
        setCircularBar(false);

        if (data.status === 200) {
            setLoginSuccess("success");
            props.onChangeIsAdmin(true);
            props.onChangeModalOpen(false);

        } else if (data.status === 400) {
            setLoginSuccess("fail");
        } else {
            setLoginSuccess("error");
        }
    }
 
    return (
        <Modal
            open={props.modalOpen}
            onClose={() => props.onChangeModalOpen(false)}
        >
            <Box sx={modalStyle}>
                <Stack spacing={1}>
                    <Typography variant="h6" sx={{marginBottom: '1rem'}}>
                        관리자 로그인
                    </Typography>
                    <TextField 
                        error={fieldCheck && !id}
                        value={id} 
                        onChange={idChangeHandler} 
                        label="ID"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField 
                        type="password"
                        error={fieldCheck && !pw}
                        value={pw} 
                        onChange={pwChangeHandler} 
                        label="password"
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button variant='outlined' onClick={loginButtonClickHandler}>Log in</Button>
                    {loginSuccess === "error" &&
                        <Alert severity="error">로그인 중 에러가 발생했습니다.</Alert>
                    }
                    {loginSuccess === "fail" &&
                        <Alert severity="warning">아이디 혹은 패스워드가 잘못되었습니다.</Alert>
                    }
                    {circularBar &&
                        <CircularProgress color="success" sx={{alignSelf: 'center', mt: 1}}/>
                    }
                </Stack>
            </Box>
        </Modal>
    )
}
const modalStyle = {
    position: 'absolute' as 'absolute',
    textAlign: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    padding: '4rem',
};
