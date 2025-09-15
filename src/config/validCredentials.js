export const validCredentials = [
    {
      accessCode: 'December2024',
    },
    {
      accessCode: `${new Date().toLocaleString("default",{month:"long"})}${new Date().getFullYear()}`,
    },
    {
      accessCode: 'testUser',
    }
];