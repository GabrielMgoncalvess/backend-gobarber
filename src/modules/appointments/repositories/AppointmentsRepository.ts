// O REPOSITÓRIO vai ser responsável por criar, armazenar, ler, deletar, editar os dados de Appointments, portanto é necessario que a coneção com o banco de dados (neste momento apemas uma variavel) seja feita aqui. 
import Appointment from '../infra/typeorm/entities/Appointment';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository <Appointment> {

   public async findByDate (date: Date): Promise<Appointment | null> {
    
    const findAppointment = await this.findOne({
        where: { date },
    })
    return findAppointment || null
   }
}

export default AppointmentsRepository;