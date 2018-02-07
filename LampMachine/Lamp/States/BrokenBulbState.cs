using System;

namespace Lamp.States
{
	internal class BrokenBulbState : ILampState
	{
		public bool IsOn => false;
		public bool HasBrokenBulb => true;

		private INamedEntity _breaker;

		public BrokenBulbState(INamedEntity breaker)
		{
			_breaker = breaker;
		}

		public void SwitchOn(Lamp lamp)
		{
			EmitError();
		}

		public void SwitchOff(Lamp lamp)
		{
			EmitError();
		}

		public void BreakLightBulb(Lamp lamp, INamedEntity breaker)
		{
			Console.WriteLine($"{breaker.Name} tried to break the blub, but {_breaker.Name} already broke it!");
		}

		public void FixLightBulb(Lamp lamp)
		{
			lamp.ChangeState(new NewBulbState());
		}

		public void OnEnter(Lamp lamp)
		{
			Console.WriteLine($"{_breaker.Name} broke the lightbulb!");
		}

		private void EmitError()
		{
			Console.WriteLine("Light bulb is broken! You should fix it!");
		}
	}
}
