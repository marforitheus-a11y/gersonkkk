import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  temaEscuro: boolean;
  onAlternarTema: () => void;
}

export default function Header({ temaEscuro, onAlternarTema }: HeaderProps) {
  return (
    <header className="border-b-4 border-foreground bg-background">
      <div className="container py-8">
        <div className="flex items-start justify-between gap-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              VAMO PASSAR
            </h1>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              NO GERSON
            </h2>
            <p className="text-lg md:text-xl font-bold max-w-md" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Simulado de questões pra passar na materia desse fdp
            </p>
          </div>

          {/* Tema */}
          <Button
            onClick={onAlternarTema}
            className="btn-brutal bg-foreground text-background hover:bg-foreground"
            title={temaEscuro ? 'Modo claro' : 'Modo escuro'}
          >
            {temaEscuro ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
