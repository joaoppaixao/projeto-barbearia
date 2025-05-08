import api from '../services/api'
public class cliente
{
    public Guid id {get; private set;}
    public String nome{get; private set;}
    public String email{get; private set;}
    public String telefone{get; private set;}
    public String senha{get;private set}

    private cliente(){ }

    public static cliente Criar(){
        
}