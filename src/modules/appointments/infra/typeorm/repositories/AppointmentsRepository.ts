import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import Appointment from '../entities/Appointment';
import Appoitment from '../entities/Appointment';

//SOLID

//Liskov Substituion Principle

class AppointmentsRepository implements IAppointmentsRepository{
  private ormRepository:Repository<Appointment>

  constructor(){
    this.ormRepository =  getRepository(Appointment)
  }
  public async findByDate(date: Date): Promise<Appoitment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment || undefined;
  }

  public async create({provider_id,date}:ICreateAppointmentDTO):Promise<Appointment>{
      const appointment = this.ormRepository.create({provider_id,date});

      await this.ormRepository.save(appointment)

      return appointment;
  }
}

export default AppointmentsRepository;
