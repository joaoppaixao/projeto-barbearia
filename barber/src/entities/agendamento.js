import barbeiro from "entities/barbeiro"
public class Agendamento
{
    public Guid id { get; private set; }
    public string titulo { get; private set; }
    public string local { get; private set; }
    public bool confirmado { get; private set; }

    private Agendamento() { }


    public static Agendamento Criar(string titulo, DateTime dataHora, string local)
    {
        if (string.IsNullOrWhiteSpace(titulo))
            throw new ArgumentException("Título não pode ser vazio.");
        if (dataHora <= DateTime.Now)
            throw new ArgumentException("Data e hora devem ser no futuro.");
        if (string.IsNullOrWhiteSpace(local))
            throw new ArgumentException("Local não pode ser vazio.");

        return new Agendamento
        {
            Id = Guid.NewGuid(),
            Titulo = titulo,
            DataHora = dataHora,
            Local = local,
            Confirmado = false
        };
    }

    // Método para confirmar o agendamento
    public void Confirmar()
    {
        if (DataHora <= DateTime.Now)
            throw new InvalidOperationException("Não é possível confirmar um agendamento no passado.");
        Confirmado = true;
    }

    // Método para cancelar o agendamento
    public void Cancelar()
    {
        if (DataHora <= DateTime.Now)
            throw new InvalidOperationException("Não é possível cancelar um agendamento no passado.");
        Confirmado = false;
    }
}