import Appointment from '../infra/typeorm/entities/Appointment';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';


interface request {
    provider_id: string;
    date: Date;
}

class CreateAppointmenrService {

    public async execute({ provider_id, date }:request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentAtSameDate = await appointmentsRepository.findByDate(appointmentDate);
    
        if (findAppointmentAtSameDate) {
            throw new AppError('This appointment is already booked');
        }
        const appointment = appointmentsRepository.create({provider_id, date: appointmentDate});
        
        await appointmentsRepository.save(appointment);

        return appointment;
    };

}
export default CreateAppointmenrService;

