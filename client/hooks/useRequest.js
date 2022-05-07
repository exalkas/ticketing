import axios from 'axios'
import {useState} from 'react'

export default function useRequest({url, method, body, onSuccess}) {

    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
    
        try {
            
            setErrors(null);
            const response = await axios[method](url, body);

            console.log('UseRequest: Response:', response);

            if (onSuccess) onSuccess(response.data)

        } catch (error) {
            
            console.log('UseRequest: Error:', error.message);
            console.log('UseRequest: Error:', error.response.data.errors);
            setErrors(
                <div>
                    <h4>Error:</h4>
                    <ul>
                        {
                            error.response.data.errors.map(item => <li key={item.message}>{item.message}</li>)
                        }
                    </ul>
                </div>
            )
        }
    }

    return {doRequest, errors};
}