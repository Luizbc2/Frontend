import { useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00"
];

const appointments = [
  {
    id: 1,
    time: "10:00",
    client: "João Silva",
    service: "Corte + Barba",
    professional: "Fodedor",
    status: "confirmado",
    duration: 1
  },
  {
    id: 2,
    time: "14:30",
    client: "Pedro Santos",
    service: "Corte Simples",
    professional: "Fodedor",
    status: "pendente",
    duration: 1
  }
];

export function AgendaTimeline() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProfessional, setSelectedProfessional] = useState("todos");
  const [selectedStatus, setSelectedStatus] = useState("todos");

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long"
    }).toUpperCase();
  };

  const previousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const nextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const today = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
          GESTÃO DIÁRIA &gt; {formatDate(selectedDate)}
        </p>
        <p className="text-xs text-gray-500">
          Cmd/Ctrl + B alterna a navegação
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Date Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={previousDay}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={today}
              className="min-w-[100px]"
            >
              Hoje
            </Button>
            <span className="px-4 py-2 bg-gray-50 rounded min-w-[200px] text-center text-sm">
              {selectedDate.toLocaleDateString("pt-BR")}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={nextDay}
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="fodedor">Fodedor</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Status</SelectItem>
                <SelectItem value="confirmado">Confirmado</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header */}
            <div className="grid grid-cols-[100px_1fr] border-b border-gray-200 bg-gray-50">
              <div className="p-4 border-r border-gray-200">
                <p className="text-sm">Horário</p>
              </div>
              <div className="p-4">
                <p className="text-sm">Fodedor</p>
              </div>
            </div>

            {/* Time Slots */}
            <div className="divide-y divide-gray-200">
              {timeSlots.map((time) => {
                const appointment = appointments.find(apt => apt.time === time);
                
                return (
                  <div key={time} className="grid grid-cols-[100px_1fr] hover:bg-gray-50 transition-colors">
                    <div className="p-4 border-r border-gray-200">
                      <p className="text-sm text-gray-600">{time}</p>
                    </div>
                    <div className="p-2">
                      {appointment ? (
                        <div className={`p-3 rounded-lg ${
                          appointment.status === "confirmado" 
                            ? "bg-green-100 border border-green-300" 
                            : "bg-yellow-100 border border-yellow-300"
                        }`}>
                          <p className="text-sm mb-1">
                            <span className="inline-block w-2 h-2 rounded-full bg-[#4a9d9d] mr-2"></span>
                            {appointment.client}
                          </p>
                          <p className="text-xs text-gray-600">{appointment.service}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {appointment.status === "confirmado" ? "Confirmado" : "Pendente"}
                          </p>
                        </div>
                      ) : (
                        <div className="h-full min-h-[60px]"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
