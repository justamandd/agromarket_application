import {Request, Response} from "express";
import IPayload from "../intefaces/IPayload";
import IFarm from "../intefaces/IFarm";
import {createFarmSchema} from "../schemas/FarmSchema";
import FarmModel from "../models/FarmModel";
import FarmService from "../services/FarmService";

const farmService = new FarmService();

export const createFarmProfile = (req: Request, res: Response) => {
    const data = req.body as IFarm;

    const response: IPayload = {
        status: 400, message: "Unexpected error", payload: null
    };

    const {error, value} = createFarmSchema.validate(data);

    if (error) {
        response.message = error.message;
        return res.status(200).send(response)
    }

    const farm = new FarmModel(data);

    farmService.createFarm(farm)
        .then(data => {
            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IFarm;

            res.send(response)
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}

export const getAllFarms = (req: Request, res: Response) => {
    const response: IPayload = {
        status: 400, message: "Unexpected error", payload: null
    };

    farmService.listFarms()
        .then(data => {
            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IFarm[];

            res.send(response)
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })

}

export const getFarm = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const response: IPayload = {
        status: 400, message: "Unexpected error", payload: null
    };

    if (!id) {
        response.message = "Product Id must be inputted";
        return res.status(200).send(response)
    }

    farmService.getFarm(new FarmModel({id} as IFarm))
        .then(data => {
            if (!data) {
                response.message = "No farm for this id"
                return res.send(response);
            }

            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IFarm;

            res.send(response)
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}
export const getFarmByCustomer = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const response: IPayload = {
        status: 400, message: "Unexpected error", payload: null
    };

    if (!id) {
        response.message = "Product Id must be inputted";
        return res.status(200).send(response)
    }

    farmService.getFarmByCustomer(new FarmModel({fk_customer_id: id} as IFarm))
        .then(data => {
            if (!data) {
                response.message = "No farm for this id"
                return res.send(response);
            }

            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IFarm;

            res.send(response)
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}
