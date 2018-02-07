using Lamp.States;

namespace Lamp
{
	public class Lamp : INamedEntity
	{
		private ILampState _state;

		public bool IsOn => _state.IsOn;
		public bool HasBrokenBulb => _state.HasBrokenBulb;
		
		public string Name { get; protected set; }

		internal int _numOfTimesTurnedOn;

		public Lamp(string name)
		{
			Name = name;
			_state = new LampOffState();
			_numOfTimesTurnedOn = 0;
		}

		public void FlipSwitch()
		{
			if (IsOn)
			{
				_state.SwitchOff(this);
				return;
			}
			
			_state.SwitchOn(this);
		}

		public void ReplaceBulb()
		{
			_state.FixLightBulb(this);
		}

		public void BreakBulb(INamedEntity namedEntity)
		{
			_state.BreakLightBulb(this, namedEntity);
		}
		
		internal void ChangeState(ILampState newState)
		{
			_state = newState;
			_state.OnEnter(this);
		}
	}
}
