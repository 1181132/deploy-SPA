import mongoose from 'mongoose';
import { ICamiaoPersistence } from '../../dataschema/ICamiaoPersistence';

const Camiao = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true,
        },

        matricula: {
            type: String,
            unique: true,
            index: true
        },

        tara: {
            type: Number,
            index: true,
        },

        capacidadeCarga: {
            type: Number,
            index: true,
        },

        cargaTotalBaterias: {
            type: Number,
            index: true,
        },

        autonomiaCargaMax: {
            type: Number,
            index: true,
        },

        tempoCarregamento20ate80: {
            type: Number,
            index: true,
        }
        
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ICamiaoPersistence & mongoose.Document>(
    'Camiao',
    Camiao
);