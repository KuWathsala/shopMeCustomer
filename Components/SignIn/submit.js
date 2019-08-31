import { SubmissionError } from 'redux-form';
import * as actions from '../Customer/Redux/Actions/index';
import {authVerify} from '../Customer/Redux/Actions/Auth';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const submit=(values)=> {
  return sleep(1000).then(() => {
      authVerify(values.Email,values.Password)
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      console.log(values);
    }) 
}

export default submit;