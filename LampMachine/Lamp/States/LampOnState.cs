using System;

namespace Lamp.States
{
	internal class LampOnState : ILampState
	{
		public bool IsOn => true;

		public bool HasBrokenBulb => false;
		
		public void SwitchOn(Lamp lamp)
		{
			
		}

		public void SwitchOff(Lamp lamp)
		{
			lamp.ChangeState(new LampOffState());
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
			Console.WriteLine("Light is On!");
			lamp._numOfTimesTurnedOn++;
			
			if (lamp._numOfTimesTurnedOn > 20)
				BreakLightBulb(lamp, lamp);
		}
	}
}
