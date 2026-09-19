import Home from '@/app/page';
import { redirect } from 'next/navigation';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('Root Home Page', () => {
  it('redirects to /users route', () => {
    Home();
    expect(redirect).toHaveBeenCalledWith('/users');
  });
});
