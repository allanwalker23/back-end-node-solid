import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService';


describe('CreateAppointment',()=>{
    it('should be able to create a new appointment', async()=>{
        const fakeAppointmentsRepository= new FakeAppointmentsRepository();
        const createAppointment= new CreateAppointmentService(
            fakeAppointmentsRepository
        )

        const appointment=await createAppointment.execute({
            date:new Date(),
            provider_id:'227722',
        });

        expect(appointment).toHaveProperty('id');
        
    });

    it('should not be able to create two appointment on the same date', async()=>{
        const fakeAppointmentsRepository= new FakeAppointmentsRepository();
        const createAppointment= new CreateAppointmentService(
            fakeAppointmentsRepository
        )

        const appointmentDate= new Date(2020, 4, 10, 11);

        const appointment=await createAppointment.execute({
            date:appointmentDate,
            provider_id:'227722',
        });

        expect(
            createAppointment.execute({
                date:appointmentDate,
                provider_id:'227722',
            })
        ).rejects.toBeInstanceOf(AppError);
        
    });

    

})