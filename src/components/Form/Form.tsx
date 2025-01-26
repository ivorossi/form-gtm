import React, { useState } from 'react';
import { FormContainer, Label, Input, Button } from './Form.styles';
import { FormData, FormProps } from './Form.types';

const Form: React.FC<FormProps> = ({ apiEndpoint }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    documentNumber: '',
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
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
        // Handle the response as needed
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
      <Input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <Label htmlFor="documentNumber">Document Number:</Label>
      <Input
        type="text"
        id="documentNumber"
        name="documentNumber"
        value={formData.documentNumber}
        onChange={handleChange}
        required
      />

      <Label htmlFor="phone">Phone:</Label>
      <Input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <Label htmlFor="email">Email:</Label>
      <Input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Button type="submit">Submit</Button>
    </FormContainer>
  );
};

export default Form;