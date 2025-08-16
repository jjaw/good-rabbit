"use client"

import { useState } from "react";
import { Card, TextInput, Textarea, Button, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';

export default function Form() {
  const [formData, setFormData] = useState({
    senderName: "",
    recipientName: "",
    email: "",
    extra: ""
  });

  const [characterCount, setCharacterCount] = useState(0);

  const [isGenerating, setIsGenerating] = useState(false); // Check to see if response is generating

  // Shared input styles for consistency
  const inputStyles = {
    input: {
      background: 'rgba(255, 175, 204, 0.1)',
      border: '1px solid rgba(255, 175, 204, 0.4)',
      color: '#4a5568',
      '&::placeholder': {
        color: 'rgba(205, 180, 219, 0.7)'
      },
      '&:focus': {
        borderColor: '#ffafcc',
        boxShadow: '0 0 0 2px rgba(255, 175, 204, 0.3)'
      }
    }
  };

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));

    if (fieldName === 'extra') {
      setCharacterCount(fieldValue.length);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    const data = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/openai/api', {
        method: 'post',
        body: JSON.stringify(Object.fromEntries(data)),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse && errorResponse.error) {
          throw new Error(errorResponse.error);
        } else {
          throw new Error("An error has occurred");
        }
      }
      notifications.show({
        title: 'Success!',
        message: 'Positivity sent to your friend~ gRabbit',
        color: 'pastelPink'
      });

    } catch (err) {
      console.error(err);
      if (err.message == "say nicer things~") {
        notifications.show({
          title: 'Error',
          message: "Say nice things ~ Spread positivity",
          color: 'red'
        });
      } else {
        notifications.show({
          title: 'Error', 
          message: "An error has occurred",
          color: 'red'
        });
      }
    }
    setIsGenerating(false);
  }

  return(
    <Card 
      shadow="xl" 
      padding="xl" 
      radius="lg"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 175, 204, 0.3)',
        boxShadow: '0 25px 50px -12px rgba(205, 180, 219, 0.4), 0 0 0 1px rgba(255, 200, 221, 0.3)'
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          <TextInput
            name="senderName"
            value={formData.senderName}
            onChange={(e) => handleInput(e)}
            placeholder="Your Name (Optional)"
            maxLength={50}
            variant="filled"
            size="md"
            styles={inputStyles}
          />
          
          <TextInput
            name="recipientName"
            value={formData.recipientName}
            onChange={(e) => handleInput(e)}
            placeholder="Their Name"
            maxLength={88}
            required
            variant="filled"
            size="md"
            styles={inputStyles}
          />
          
          <TextInput
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleInput(e)}
            placeholder="Their Email"
            maxLength={50}
            required
            variant="filled"
            size="md"
            styles={inputStyles}
          />
          
          <div>
            <Textarea
              name="extra"
              value={formData.extra}
              onChange={(e) => handleInput(e)}
              placeholder="Anything you want to ADD? (Optional)"
              maxLength={200}
              rows={7}
              variant="filled"
              size="md"
              resize="none"
              styles={inputStyles}
            />
            <Text size="sm" c="pastelPurple.5" ta="right" mt="xs">
              {characterCount} / 200
            </Text>
          </div>
          
          <Button
            type="submit"
            disabled={isGenerating || formData.email === "" || formData.recipientName === ""}
            loading={isGenerating}
            size="md"
            fullWidth
            variant="gradient"
            gradient={{ from: 'pastelRose.5', to: 'pastelPink.6', deg: 45 }}
            styles={{
              root: {
                fontWeight: 600,
                fontSize: '16px',
                height: '48px',
                border: '1px solid rgba(255, 175, 204, 0.4)',
                boxShadow: '0 4px 14px 0 rgba(255, 175, 204, 0.4)',
                '&:hover': {
                  boxShadow: '0 6px 20px 0 rgba(255, 175, 204, 0.5)'
                }
              }
            }}
          >
            {isGenerating ? "Sending..." : "Send Positivity"}
          </Button>
        </Stack>
      </form>
    </Card>
  )
}