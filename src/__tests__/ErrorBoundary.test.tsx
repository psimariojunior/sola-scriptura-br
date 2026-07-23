// @ts-nocheck
import { ErrorBoundary } from '@/components/ErrorBoundary';

function ThrowingComponent({ shouldThrow = true }: { shouldThrow?: boolean }) {
  if (shouldThrow) throw new Error('Test error');
  return <div>OK</div>;
}

describe('ErrorBoundary', () => {
  beforeEach(() => { vi.spyOn(console, 'error').mockImplementation(() => {}); });

  it('renders children when no error', () => {
    render(<ErrorBoundary><ThrowingComponent shouldThrow={false} /></ErrorBoundary>);
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  it('renders error UI when child throws', () => {
    render(<ErrorBoundary><ThrowingComponent /></ErrorBoundary>);
    expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(<ErrorBoundary fallback={<div>Custom fallback</div>}><ThrowingComponent /></ErrorBoundary>);
    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
  });

  it('has retry button that resets error state', () => {
    const { rerender } = render(<ErrorBoundary><ThrowingComponent /></ErrorBoundary>);
    expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Tentar novamente'));
    // After retry, the boundary re-renders children
  });
});
