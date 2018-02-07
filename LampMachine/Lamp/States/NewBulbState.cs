using System;

namespace Lamp.States
{
	internal class NewBulbState : ILampState
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
			
		}

		public void OnEnter(Lamp lamp)
		{
			Console.WriteLine("Bulb replaced!");
			lamp._numOfTimesTurnedOn = 0;
		}
	}
}
