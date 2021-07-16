import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
//startOfHour arredonda a hora (somente horas);
//parseISO coloca no formato ISO
// o date fns converte tudo para date nativa do javascript
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmenrService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticanted from '@modules/users/infra/http/middlewares/ensureAuthenticated';

//ROTA: receber a requisição, chamar outro arquivo, devolver uma resposta 

const appointmentsRouter = Router();

//aplicando o middle de autenticação, poderia ser colocado individualmente em cada rota, logo após a '/',
appointmentsRouter.use(ensureAuthenticanted);

//RETORNA TODOS OS AGENDAMENTOS 
appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
});

//CRIA UM NOVO AGENDAMENTO E VERIFICA SE JA TEM OUTRO CRIADO NA MESMA HORA
appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);
        
        const createAppointment = new CreateAppointmenrService();

        const appointment = await createAppointment.execute({ date: parsedDate, provider_id});

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message})
    }

});
export default appointmentsRouter