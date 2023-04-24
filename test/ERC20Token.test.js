const ERC20Token = artifacts.require("ERC20Token");

contract("ERC20Token", accounts => {
  // 测试mint方法
  it("mint", async() => {
      const instance = await ERC20Token.deployed();

      // Test contract name
      const name = await instance.name.call();
      assert.equal(name, "ERC20 Token"); // deploy的信息在migrations的js中
      const symbol = await instance.symbol.call();
      assert.equal(symbol, "JAY-TK"); // deploy的信息在migrations的js中

      // Test mint function
      let user = accounts[2]; // eth address
      assert.equal(user, "0x88eBF600Ab3cb4714404315e633EB90da582F51C");
      let mint_amount = 127;
      // await instance.mint.call(user, mint_amount); // wrong usage!!! won't change the balance!!!
      await instance.mint(user, mint_amount); // mint
      const user_balance = await instance.balanceOf.call(user); // get the user balance
      const total_supply = await instance.totalSupply.call(); // get the total supply
      console.log('contract total supply: ' + total_supply); // log out the total supply
      assert.equal(user_balance.toNumber(), mint_amount);
    }
  )
}) 