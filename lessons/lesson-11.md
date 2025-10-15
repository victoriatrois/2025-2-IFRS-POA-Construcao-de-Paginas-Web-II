# Lesson 11 - Nuxt.js I

## Promisses

Objeto que representa o resultado de uma operação assíncrona.

Ela pode ter três estados: pendente, resolvida (sucesso) e rejeitada (erro).

Para criar uma função que retorna uma promessa, sua assinatura leva os parâmetro duas funções: resolve e reject.

Essas funções são fornecidas pelo próprio JS.

Uma função que retorna uma promisse deve ser marcada com a palavra reservada async.

```javascript
async function main() {
  try {
    await doSomething();
    throw new Error("Something failed");
    console.log("Do this");
  } catch (e) {
    console.error("Do that");
  }
  console.log("Do this, no matter what happened before");
}
```
