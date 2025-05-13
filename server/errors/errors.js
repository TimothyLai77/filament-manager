class NotEnoughFilamentError extends Error { };
class TooMuchFilamentError extends Error { };
class SpoolNotFoundError extends Error { };
class JobNotFoundError extends Error { };

export { TooMuchFilamentError, NotEnoughFilamentError, SpoolNotFoundError, JobNotFoundError };