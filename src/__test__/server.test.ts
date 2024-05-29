import { connectDB } from '../server'
import db from '../config/db'


jest.mock('../config/db')

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'))

        const consoleSoy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSoy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar la DB')
        )
    })
})