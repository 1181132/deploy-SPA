import mongoose from 'mongoose';
import { IPercursoPersistence } from '../../dataschema/IPercursoPersistence';

const Percurso = new mongoose.Schema(
    {
        armazem1: {
            type: String,
            unique: true,
            index: true,
        },

        armazem2: {
            type: String,
            unique: true,
            index: true,
        },

        distancia: {
            type: Number,
            index: true,
        },

        tempo: {
            type: Number,
            index: true,
        },

        energia: {
            type: Number,
            index: true,
        },

        cargaExtra: {
            type: Number,
            index: true,
        },
        
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IPercursoPersistence & mongoose.Document>(
    'Percurso',
    Percurso
);