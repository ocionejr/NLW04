import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController{

    // http://localhost:3333/answers/3?u=ce7fdd3c-7391-43c4-963c-0bcdb9e7dcbd

    async execute(request: Request, response: Response){
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
    
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if(!surveyUser){
            throw new AppError("Survey user does not exists");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController }