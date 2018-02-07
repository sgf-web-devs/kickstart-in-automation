using Lamp;

namespace MachineRunner
{
	public static class Program
	{
		public static void Main(string[] args)
		{
			var lamp = new Lamp.Lamp("Mr Lamperdoodle");

			while (!lamp.HasBrokenBulb)
			{
				lamp.FlipSwitch();
			}
			
			lamp.ReplaceBulb();
			lamp.FlipSwitch();
			lamp.FlipSwitch();
			lamp.BreakBulb(new NamedEntity("Myke"));
			lamp.BreakBulb(new NamedEntity("Frederick"));
			lamp.ReplaceBulb();
		}
	}
}
