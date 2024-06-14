import {FC, useState} from "react"
import TextInput from "../components/text-input/Text-input"


const Test:FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return (
    <div className="container mt-5">
      <h1>Test Page</h1>
      <TextInput label="Name" value={name} onChange={handleNameChange} />
      <TextInput label="Email" value={email} onChange={handleEmailChange} type="email"/>
      <TextInput label="Password" value={password} onChange={handlePasswordChange} type="password" />
    </div>
  );
};

export default Test