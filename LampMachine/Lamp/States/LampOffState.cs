using System;

namespace Lamp.States
{
	internal class LampOffState : ILampState
	{
		public bool IsOn => false;
		
		public bool HasBrokenBulb => false;
		
		public void SwitchOn(Lamp lamp)
		{
			lamp.ChangeState(new LampOnState());
		}

		public void SwitchOff(Lamp lamp)
		{
			Console.WriteLine("Lamp is already off!");
		}

		public void BreakLightBulb(Lamp lamp, INamedEntity breaker)
		{
			lamp.ChangeState(new BrokenBulbState(breaker));
		}

		public void FixLightBulb(Lamp lamp)
		{
			lamp.ChangeState(new NewBulbState());
		}

		public void OnEnter(Lamp lamp)
		{
			Console.WriteLine("Light is off!");
		}
	}
}
