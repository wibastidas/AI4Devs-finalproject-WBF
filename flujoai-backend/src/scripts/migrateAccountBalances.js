const { Transaction, Account, AccountBalance } = require('../models/associations');
const sequelize = require('../config/database');

async function migrateAccountBalances() {
    try {
        console.log('🚀 Sincronizando modelos...');
        
        // Sincronizar modelos en orden
        await Account.sync();
        await AccountBalance.sync();
        
        console.log('📊 Iniciando migración de balances...');
        const t = await sequelize.transaction();
        
        try {
            // Obtener todas las cuentas
            const accounts = await Account.findAll();
            console.log(`💳 Encontradas ${accounts.length} cuentas`);
            
            for (const account of accounts) {
                console.log(`\n📝 Procesando cuenta: ${account.name} (ID: ${account.id})`);
                
                // Obtener todas las transacciones de la cuenta
                const transactions = await Transaction.findAll({
                    where: { account_id: account.id }
                });
                
                console.log(`📊 Encontradas ${transactions.length} transacciones`);
                
                // Calcular balance
                const balance = transactions.reduce((acc, transaction) => {
                    const amount = Number(transaction.amount);
                    return acc + (transaction.type === 'income' ? amount : -amount);
                }, 0);
                
                console.log(`💰 Balance calculado: ${balance}`);
                
                // Crear o actualizar el balance de la cuenta
                const [accountBalance, created] = await AccountBalance.findOrCreate({
                    where: { account_id: account.id },
                    defaults: { 
                        current_balance: balance,
                        last_updated: new Date()
                    },
                    transaction: t
                });

                if (!created) {
                    await accountBalance.update({
                        current_balance: balance,
                        last_updated: new Date()
                    }, { transaction: t });
                }
                
                console.log(`✅ Balance ${created ? 'creado' : 'actualizado'} correctamente`);
            }
            
            await t.commit();
            console.log('\n✨ Migración completada exitosamente');
            
        } catch (error) {
            await t.rollback();
            throw error;
        }
        
    } catch (error) {
        console.error('❌ Error durante la migración:', error);
        throw error;
    }
}

// Ejecutar si este archivo se llama directamente
if (require.main === module) {
    migrateAccountBalances()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('Error fatal:', error);
            process.exit(1);
        });
}

module.exports = migrateAccountBalances;
