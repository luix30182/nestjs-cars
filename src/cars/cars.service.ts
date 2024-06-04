import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car';
import { v4 as uuid } from 'uuid';
import { CreateCartDto } from './dto/create-car.dto';
import { UpdateCartDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Array<Car> = [
    {
      id: uuid(),
      brand: 'Volkswagen',
      model: 'Jetta',
    },
    {
      id: uuid(),
      brand: 'Seat',
      model: 'Cupra',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
  ];

  findAll() {
    return this.cars;
  }

  getCarById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with Id ${id} not found`);
    }

    return car;
  }

  create(createCartDto: CreateCartDto) {
    const car: Car = {
      ...createCartDto,
      id: uuid(),
    };

    this.cars.push(car);

    return car;
  }

  update(id: string, updateCarDtop: UpdateCartDto) {
    let carDb = this.getCarById(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDb = {
          ...carDb,
          ...updateCarDtop,
          id,
        };
        return carDb;
      }
      return car;
    });

    return carDb;
  }

  delete(id: string) {
    const index = this.cars.findIndex((c) => c.id === id);
    if (index < 0) {
      throw new NotFoundException(`Car with Id ${id} not found`);
    }

    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
