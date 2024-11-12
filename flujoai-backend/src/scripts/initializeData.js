const { User, Business } = require('../models/associations');
const sequelize = require('../config/database');

async function initializeData() {
    const t = await sequelize.transaction();
    
    try {
        console.log('🚀 Iniciando creación de datos iniciales...');
        
        // Crear negocio inicial
        const business = await Business.findOrCreate({
            where: { id: 1 },
            defaults: {
                name: 'Dtx'
            },
            transaction: t
        });
        
        // Crear usuario administrador
        const [user, userCreated] = await User.findOrCreate({
            where: { email: 'admin@flujoai.com' },
            defaults: {
                username: 'admin',
                password: '123456', // Deberías usar una contraseña hasheada en producción
            },
            transaction: t
        });

        // Asociar usuario con negocio
        await user.addBusiness(business[0], { transaction: t });
        
        await t.commit();
        console.log('✅ Datos iniciales creados exitosamente');
        
    } catch (error) {
        await t.rollback();
        console.error('❌ Error creando datos iniciales:', error);
        throw error;
    }
}

if (require.main === module) {
    initializeData()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('Error fatal:', error);
            process.exit(1);
        });
}