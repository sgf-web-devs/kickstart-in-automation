namespace Lamp.States
{
	internal interface ILampState
	{
		bool IsOn { get; }
		bool HasBrokenBulb { get; }
		void SwitchOn(Lamp lamp);
		void SwitchOff(Lamp lamp);
		void BreakLightBulb(Lamp lamp, INamedEntity breaker);
		void FixLightBulb(Lamp lamp);
		void OnEnter(Lamp lamp);
	}
}
