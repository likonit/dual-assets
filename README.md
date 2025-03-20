## Стратегия 1
Эта стратегия позволяет реализовать ситуацию, когда инвестор 1 день
* budget = 1000$;
* Ставим budget на достижение целевой цены текущей монеты;
* Если целевая цена **не достигнута**, то:
    * мы получаем обратно наши USDT с процентом APR `(budget *= 1 + (APR / 365 / 100))`;
    * Переходим к следующей монете по списку;
    * Возвращаемся к пункту 2;
* Если целевая цена **достигнута**, то:
    * Алгоритм покупает наши монеты по целевой цене;
    * Алгоритм начисляет проценты на нашу монету `(coinCount *= 1 + (APR / 365 / 100))`;
    * Переходим к следующей монете по списку;
    * Возвращаемся к пункту 1;



## Стратегия 2
Эта стратегия позволяет 1, 3, 8 дней
* budget = 1000$;
* Ставим budget на достижение целевой цены текущей монеты;
* Если целевая цена **не достигнута**, то:
    * мы получаем обратно наши USDT с процентом APR;
    * На весь budget покупаем следующую монету в списке по рыночной цене;
    * Переходим к следующей монете;
    * Возвращаемся к пункту 1;
* Если целевая цена **достигнута**, то:
    * Алгоритм покупает наши монеты по целевой цене;
    * Алгоритм начисляет проценты на нашу монету;
    * Переходим к следующей монете по списку;
    * Возвращаемся к пункту 1;

## Стратегия 3
Эта стратегия позволяет 1, 3, 8 дней
* budget = 1000$;
* Ставим budget на достижение целевой цены текущей монеты;
* Если целевая цена **не достигнута**, то:
    * мы получаем обратно наши USDT с процентом APR;
    * Переходим к следующей монете;
    * Переносим бюджет с предыдущей монеты на следующую `(budget += 1000$);`
    * Возвращаемся к пункту 2;
* Если целевая цена **достигнута**, то:
    * Алгоритм покупает наши монеты по целевой цене;
    * Алгоритм начисляет проценты на нашу монету;
    * Переходим к следующей монете по списку;
    * Возвращаемся к пункту 1;