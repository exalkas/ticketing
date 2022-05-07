import {useState} from 'react'
import useRequest from '../hooks/useRequest';
import Router from 'next/router'

export default function Register() {

    const [user, setUser] = useState({
        email: '',
        pass: ''
    });

    const {doRequest, errors} = useRequest({
        url: '/users/register',
        method: 'post',
        body: {...user},
        onSuccess: () => Router.push('/')
    })

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log('Submit pressed: user', user);

        doRequest();

        // TODO: CHECK IF COOKIE IS THERE
    }

    return <div>
    <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" name="email" value={user.email} onChange={e=> setUser({...user, email: e.target.value})}/>
        <label>Password</label>
        <input type="text" name="pass" value={user.pass} onChange={e=> setUser({...user, pass: e.target.value})}/>
        {errors}
        <input type="submit" value="Register"/>
    </form>
        Hello from register</div>
}