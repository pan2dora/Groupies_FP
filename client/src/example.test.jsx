
import MyNavBar from './components/Navbar';
import {expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import Student from './components/Student';

test('Navbar renders correctly', () => {
  const { getByTestId } = render(<MyNavBar />);
  const navbarElement = getByTestId('navbar');
  expect(navbarElement).toBeDefined();
});

test("Show full name of a student", () =>{
  const student = {firstname: "Jair", lastname: "Trejo"};
  const { getByText } = render(<Student student={student} />);
  const studentFullName = getByText("Jair Trejo")
  expect(studentFullName).toBeDefined()
})




import { render, screen, fireEvent } from '@testing-library/react';
import UserSignup from './UserSignup';

describe('UserSignup', () => {
  it('updates user data on form submission', async () => {
    render(<UserSignup />);

    const displayNameInput = screen.getByLabelText('Display Name:');
    const pronounsInput = screen.getByLabelText('Pronouns:');
    const dateOfBirthInput = screen.getByLabelText('Date of Birth:');
    const pictureInput = screen.getByLabelText('Picture:');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(displayNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(pronounsInput, { target: { value: 'he/him' } });
    fireEvent.change(dateOfBirthInput, { target: { value: '1990-01-01' } });
    fireEvent.change(pictureInput, { target: { value: 'https://example.com/picture.jpg' } });

    fireEvent.click(submitButton);

    await screen.findByText('User data updated successfully');

    expect(displayNameInput.value).toBe('');
    expect(pronounsInput.value).toBe('');
    expect(dateOfBirthInput.value).toBe('');
    expect(pictureInput.value).toBe('');
  });
});




import { render, screen, fireEvent } from '@testing-library/react';
import GroupPostForm from './GroupPostForm';

describe('GroupPostForm', () => {
  it('renders the form and triggers submit event', () => {
    const onSavePost = jest.fn();
    const groupId = 'group123';

    render(<GroupPostForm onSavePost={onSavePost} groupId={groupId} />);

    // Find form inputs and elements
    const textarea = screen.getByPlaceholderText("What's on your mind?");
    const searchInput = screen.getByPlaceholderText('Search GIFs');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    const postButton = screen.getByRole('button', { name: 'Post' });

    // Fill out the form inputs
    fireEvent.change(textarea, { target: { value: 'Hello, world!' } });
    fireEvent.change(searchInput, { target: { value: 'cats' } });

    // Perform search for GIFs
    fireEvent.click(searchButton);

    // Verify the form inputs and elements
    expect(textarea.value).toBe('Hello, world!');
    expect(searchInput.value).toBe('cats');
    expect(screen.queryByText('No GIFs found')).not.toBeInTheDocument();

    // Trigger form submission
    fireEvent.click(postButton);

    // Verify that onSavePost is called with the correct arguments
    expect(onSavePost).toHaveBeenCalledTimes(1);
    expect(onSavePost).toHaveBeenCalledWith(expect.objectContaining({
      content: 'Hello, world!',
      userId: expect.any(String),
      image: null,
    }));

    // Reset form inputs
    expect(textarea.value).toBe('');
    expect(searchInput.value).toBe('');

    // Verify that cancel button closes the modal
    fireEvent.click(cancelButton);
    expect(screen.queryByText('Create Post')).not.toBeInTheDocument();
  });
});




