// имитируем работу стороннего микросервиса
export class EmailService {
  /**
   * @param { string } email
   * @returns {Promise<number>}
   */

  // Зачем в функции неиспользуемые аргументы
  // У всех имейлов один и тот же id - так быть не должно
  async add({ email }) {
    return new Promise(
      (resolve) => setTimeout(() => resolve(1), 1000),
    );
  };
}
