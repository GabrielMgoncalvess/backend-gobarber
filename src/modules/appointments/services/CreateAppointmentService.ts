import Appointment from '../infra/typeorm/entities/Appointment';
import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';


interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmenrService {
    constructor( 
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({ provider_id, date }:IRequest): Promise<Appointment> {

        const appointmentDate = startOfHour(date);

        const findAppointmentAtSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
    
        if (findAppointmentAtSameDate) {
            throw new AppError('This appointment is already booked');
        }
        const appointment = await this.appointmentsRepository.create({provider_id, date: appointmentDate});

        return appointment;
    };

}
export default CreateAppointmenrService;

