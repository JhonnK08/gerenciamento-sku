import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Button } from '../ui/button';
import { Dialog, DialogFormFooter } from './index';

describe('Dialog', () => {
  it('should render title and description successfully', () => {
    render(
      <Dialog title="Meu Dialog" description="Descrição do dialog">
        <div>Conteúdo do Dialog</div>
      </Dialog>,
    );

    expect(screen.getByText('Meu Dialog')).toBeInTheDocument();
    expect(screen.getByText('Descrição do dialog')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do Dialog')).toBeInTheDocument();
  });

  it('should render trigger and render dialog successfully', async () => {
    const user = userEvent.setup();

    render(
      <Dialog title="Dialog com Trigger" trigger={<Button>Open Dialog</Button>}>
        <div>Conteúdo do Dialog</div>
      </Dialog>,
    );

    const triggerButton = screen.getByText('Open Dialog');
    expect(triggerButton).toBeInTheDocument();

    await user.click(triggerButton);
    expect(screen.getByText('Dialog com Trigger')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do Dialog')).toBeInTheDocument();
  });

  it('should render DialogFormFooter successfully', () => {
    render(<DialogFormFooter />);

    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Salvar Alterações')).toBeInTheDocument();

    render(<DialogFormFooter disabled />);
    expect(screen.getAllByText('Cancelar')[1]).toBeDisabled();
    expect(screen.getAllByText('Salvar Alterações')[1]).toBeDisabled();
  });
});
