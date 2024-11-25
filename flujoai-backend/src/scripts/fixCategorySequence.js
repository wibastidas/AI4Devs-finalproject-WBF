const sequelize = require('../config/database');

async function fixCategorySequence() {
  const t = await sequelize.transaction();
  
  try {
    console.log('🔍 Verificando máximo ID actual...');
    
    const [result] = await sequelize.query(
      'SELECT MAX(id) as max_id FROM categories;',
      { transaction: t }
    );
    
    const maxId = result[0].max_id || 0;
    console.log(`📊 ID máximo actual: ${maxId}`);
    
    await sequelize.query(
      `SELECT setval('categories_id_seq', ${maxId}, true);`,
      { transaction: t }
    );

    await t.commit();
    console.log(`✅ Secuencia actualizada exitosamente al valor ${maxId}`);
    
  } catch (error) {
    await t.rollback();
    console.error('❌ Error actualizando secuencia:', error);
  } finally {
    await sequelize.close();
  }
}

if (require.main === module) {
  fixCategorySequence()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Error fatal:', error);
      process.exit(1);
    });
}