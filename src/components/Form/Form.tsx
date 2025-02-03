import React, { useState } from 'react';
import { FormContainer, Label, Input, Button } from './Form.styles';
import { FormData, FormProps } from './Form.types';

const Form: React.FC<FormProps> = ({ apiEndpoint }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    dni: '',
    phone: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ipResponse = await fetch('https://api64.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp = ipData.ip;

      const dataToSend = { ...formData, ip: userIp };

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
      } else {
        console.error('Request error:', response.statusText);
      }
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label htmlFor="name">Name:</Label>
      <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

      <Label htmlFor="dni">DNI:</Label>
      <Input type="text" id="dni" name="dni" value={formData.dni} onChange={handleChange} required />

      <Label htmlFor="phone">Phone:</Label>
      <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

      <Label htmlFor="email">Email:</Label>
      <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

      <Button type="submit">Submit</Button>
    </FormContainer>
  );
};

export default Form;
