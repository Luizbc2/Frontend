import { useEffect, useState, type FormEvent } from "react";
import { Mail, MessageCircle, Phone, Plus, Search } from "lucide-react";

import { EmptyStatePanel, MetricCard, PageShell, SectionCard } from "../components/PageShell";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastMessage: string;
  createdAt: string;
  unread: boolean;
};

type ClientFormData = {
  name: string;
  email: string;
  phone: string;
  lastMessage: string;
};

const STORAGE_KEY = "horarius:clientes";
const initialFormData: ClientFormData = {
  name: "",
  email: "",
  phone: "",
  lastMessage: "",
};

function loadClients(): Client[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedClients = window.localStorage.getItem(STORAGE_KEY);

    if (!storedClients) {
      return [];
    }

    const parsedClients = JSON.parse(storedClients) as Client[];
    return Array.isArray(parsedClients) ? parsedClients : [];
  } catch {
    return [];
  }
}

function formatConversationTime(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function Clientes() {
  const [clients, setClients] = useState<Client[]>(loadClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<ClientFormData>(initialFormData);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  }, [clients]);

  const filteredClients = clients.filter((client) => {
    const searchableContent = [
      client.name,
      client.email,
      client.phone,
      client.lastMessage,
    ]
      .join(" ")
      .toLowerCase();

    return searchableContent.includes(searchTerm.toLowerCase());
  });

  const unreadCount = clients.filter((client) => client.unread).length;

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const handleChange = (
    field: keyof ClientFormData,
    value: string,
  ) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  };

  const handleCreateClient = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      return;
    }

    const createdAt = new Date().toISOString();

    const newClient: Client = {
      id: Date.now(),
      name: trimmedName,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      lastMessage:
        formData.lastMessage.trim() || "Conversa iniciada agora.",
      createdAt,
      unread: false,
    };

    setClients((currentClients) => [newClient, ...currentClients]);
    setDialogOpen(false);
    resetForm();
  };

  return (
    <>
      <PageShell
        eyebrow="Gestao"
        title="Relacionamento com clientes"
        description="Uma inbox mais limpa para acompanhar conversas, identificar oportunidades de retorno e manter o historico sempre a mao."
        actions={
          <Button onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            Novo cliente
          </Button>
        }
      >
        <div className="metric-grid">
          <MetricCard
            label="Clientes"
            value={String(clients.length)}
            helper="Base atual de clientes cadastrados"
            icon={<MessageCircle className="h-5 w-5" />}
          />
          <MetricCard
            label="Conversas Ativas"
            value={String(clients.length)}
            helper="Conversas iniciadas na inbox"
            icon={<MessageCircle className="h-5 w-5" />}
            accent="sand"
          />
          <MetricCard
            label="Nao Lidas"
            value={String(unreadCount)}
            helper="Mensagens aguardando resposta"
            icon={<MessageCircle className="h-5 w-5" />}
            accent="coral"
          />
        </div>

        <SectionCard
          title="Inbox de conversas"
          description="Use a busca para localizar rapidamente um cliente ou abrir o canal ideal para iniciar um novo contato."
          action={
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar conversas"
                className="pl-11"
              />
            </div>
          }
        >
          {clients.length === 0 ? (
            <EmptyStatePanel
              icon={<MessageCircle className="h-7 w-7" />}
              title="Nenhuma conversa ainda"
              description="Quando voce iniciar atendimentos por mensagem, a inbox vai mostrar o historico, horario da ultima interacao e atalhos para continuidade do contato."
              action={
                <Button onClick={openCreateDialog}>
                  <Plus className="h-4 w-4" />
                  Adicionar cliente
                </Button>
              }
            />
          ) : filteredClients.length === 0 ? (
            <EmptyStatePanel
              icon={<Search className="h-7 w-7" />}
              title="Nenhum cliente encontrado"
              description="Ajuste o termo de busca ou cadastre um novo cliente para aparecer nesta lista."
              action={
                <Button onClick={openCreateDialog}>
                  <Plus className="h-4 w-4" />
                  Novo cliente
                </Button>
              }
            />
          ) : (
            <div className="grid gap-3">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-start gap-4 rounded-[1.4rem] border border-white/70 bg-white/60 p-4 shadow-[0_18px_45px_-30px_rgba(73,47,22,0.32)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-primary text-lg font-semibold text-primary-foreground">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="truncate text-base font-semibold text-foreground">
                        {client.name}
                      </h4>
                      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {formatConversationTime(client.createdAt)}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {client.lastMessage}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {client.phone ? (
                        <span className="data-pill text-xs">
                          <Phone className="h-3.5 w-3.5" />
                          {client.phone}
                        </span>
                      ) : null}
                      {client.email ? (
                        <span className="data-pill text-xs">
                          <Mail className="h-3.5 w-3.5" />
                          {client.email}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </PageShell>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-[1.75rem] border-white/70 bg-[linear-gradient(180deg,rgba(255,251,246,0.97),rgba(248,241,231,0.94))] p-6 shadow-[0_30px_80px_-38px_rgba(73,47,22,0.34)] sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-foreground">
              Novo cliente
            </DialogTitle>
            <DialogDescription className="leading-6">
              Cadastro local para alimentar a inbox enquanto não temos o back-end.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateClient} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="client-name">Nome</label>
              <Input
                id="client-name"
                value={formData.name}
                onChange={(event) => handleChange("name", event.target.value)}
                placeholder="Ex.: Maria Oliveira"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="client-email">Email</label>
                <Input
                  id="client-email"
                  type="email"
                  value={formData.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  placeholder="maria@cliente.com"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="client-phone">Telefone</label>
                <Input
                  id="client-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => handleChange("phone", event.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="client-message">Primeira mensagem</label>
              <Textarea
                id="client-message"
                value={formData.lastMessage}
                onChange={(event) => handleChange("lastMessage", event.target.value)}
                placeholder="Adicione uma observacao ou a primeira mensagem da conversa."
                rows={4}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">
                <Plus className="h-4 w-4" />
                Salvar cliente
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
